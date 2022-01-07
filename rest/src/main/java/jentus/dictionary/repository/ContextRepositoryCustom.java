package jentus.dictionary.repository;

import jentus.dictionary.model.ContextDb;
import jentus.dictionary.model.ContextParams;

import java.util.List;

public interface ContextRepositoryCustom {
    List<ContextDb> findByParams(ContextParams contextParams);
}
