package jentus.dictionary.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class FileDto {
    private String name;
    private MultipartFile file;
}
