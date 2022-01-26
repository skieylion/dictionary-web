package jentus.dictionary.model;

import lombok.Getter;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;

import java.io.InputStream;

@Getter
public class FileS3 {
    private final String fileName;
    private final Resource resource;

    public FileS3(String fileName, InputStream data) {
        this.fileName = fileName;
        this.resource = new InputStreamResource(data);
    }
}
