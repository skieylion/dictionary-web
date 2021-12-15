package jentus.dictionary.repository;

import jentus.dictionary.model.FileTable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTableRepository extends CrudRepository<FileTable,String> {
}
