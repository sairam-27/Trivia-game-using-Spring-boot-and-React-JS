package com.project.TriviaGame.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.TriviaGame.models.ERole;
//import com.project.TriviaGame.models.ERole;
import com.project.TriviaGame.models.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole roleUser);
}