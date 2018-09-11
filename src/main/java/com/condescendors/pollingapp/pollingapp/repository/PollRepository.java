package com.condescendors.pollingapp.pollingapp.repository;

import com.condescendors.pollingapp.pollingapp.models.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll,Long>{

    Optional<Poll> findById(Long pollId);

    Page<Poll> findByCreatedBy(Long userId, Pageable pageable);

    List<Poll> findAllByCreatedBy(Long id);

    long countByCreatedBy(Long userId);

    List<Poll> findByIdIn(List<Long> pollIds);

    List<Poll> findByIdIn(List<Long> pollIds, Sort sort);
}
