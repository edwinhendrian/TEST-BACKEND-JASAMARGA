select e.id employee_id, e.nik, e."name", e.is_active, ep.gender, concat(date_part('year', age(current_date, ep.date_of_birth)), ' years old') age,
ed."name" as school_name, ed."level", case when ef.family_data isnull then '-' else ef.family_data end from employee e 
left join employee_profile ep on e.id = ep.employee_id 
left join education ed on e.id = ed.employee_id 
left join (select employee_id, string_agg(relation_count || ' ' || relation_status, ' & ' order by relation_status) family_data
	from (select employee_id, relation_status, count(*) relation_count 
		from employee_family group by relation_status, employee_id) 
	group by employee_id) ef on e.id = ef.employee_id;