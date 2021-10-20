package com.increff.employee.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.increff.employee.pojo.EmployeePojo;

@Repository
public class EmployeeDao {

	private static String delete_id = "delete from EmployeePojo p where id=:id";
	private static String select_id = "select p from EmployeePojo p where id=:id";
	private static String select_all = "select p from EmployeePojo p";

	@PersistenceContext
	private EntityManager em;

	@Transactional
	public void insert(EmployeePojo p) {
		em.persist(p);
	}

	public int delete(int id) {
		Query query = em.createQuery(delete_id);
		query.setParameter("id", id);
		return query.executeUpdate();
	}

	public EmployeePojo select(int id) {
		TypedQuery<EmployeePojo> query = getQuery(select_id);
		query.setParameter("id", id);
		return query.getSingleResult();
	}

	public List<EmployeePojo> selectAll() {
		TypedQuery<EmployeePojo> query = getQuery(select_all);
		return query.getResultList();
	}

	public void update(EmployeePojo p) {
	}

	TypedQuery<EmployeePojo> getQuery(String jpql) {
		return em.createQuery(jpql, EmployeePojo.class);
	}

}
