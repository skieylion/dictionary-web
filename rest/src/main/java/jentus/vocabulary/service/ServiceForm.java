package jentus.vocabulary.service;


import jentus.vocabulary.model.Form;
import jentus.vocabulary.model.FormDto;

import java.util.List;

public interface ServiceForm {
    void save(FormDto form);
    List<Form> findAll();
}
