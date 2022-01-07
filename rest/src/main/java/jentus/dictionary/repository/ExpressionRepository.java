package jentus.dictionary.repository;

import jentus.dictionary.model.Expression;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpressionRepository extends CrudRepository<Expression,Long> {
    List<Expression> findAll();
    Optional<Expression> findByValue(String value);
}
