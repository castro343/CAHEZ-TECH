-- Create a draft AI employee and its initial safe configuration atomically.
-- The function runs as the caller; existing agents and agent_configurations RLS
-- policies enforce owner/admin permissions for the selected workspace.

create or replace function public.create_agent(
  p_org_id uuid,
  p_name text,
  p_agent_type text,
  p_description text default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v_user_id uuid := auth.uid();
  v_agent_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  if p_org_id is null then
    raise exception 'Workspace is required' using errcode = '22023';
  end if;

  if p_name is null or char_length(trim(p_name)) not between 2 and 120 then
    raise exception 'AI employee name must be between 2 and 120 characters' using errcode = '22023';
  end if;

  if p_agent_type not in ('front_desk','sales','support','research','operations','custom') then
    raise exception 'Unsupported AI employee type' using errcode = '22023';
  end if;

  insert into public.agents (org_id,name,agent_type,description,status,created_by)
  values (p_org_id,trim(p_name),p_agent_type,nullif(trim(coalesce(p_description,'')),''),'draft',v_user_id)
  returning id into v_agent_id;

  insert into public.agent_configurations (org_id,agent_id,version,configuration,is_active,created_by)
  values (
    p_org_id,
    v_agent_id,
    1,
    jsonb_build_object(
      'instructions','',
      'channels',jsonb_build_array(),
      'permissions',jsonb_build_object('external_actions',false,'requires_approval',true)
    ),
    true,
    v_user_id
  );

  return v_agent_id;
end;
$function$;

revoke all on function public.create_agent(uuid,text,text,text) from public;
revoke all on function public.create_agent(uuid,text,text,text) from anon;
grant execute on function public.create_agent(uuid,text,text,text) to authenticated;
