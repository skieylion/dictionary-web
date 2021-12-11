package jentus.vocabulary.repository;

import jentus.vocabulary.model.FileTable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTableRepository extends CrudRepository<FileTable,String> {
}
