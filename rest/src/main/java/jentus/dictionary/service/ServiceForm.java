package jentus.dictionary.service;


import jentus.dictionary.model.Form;
import jentus.dictionary.model.FormDto;

import java.util.List;

public interface ServiceForm {
    void save(FormDto form);
    List<Form> findAll();
}
