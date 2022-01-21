package jentus.dictionary.repository;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public interface FileRepository {
    void put(String fileId,MultipartFile multipartFile) throws IOException;
    InputStream get(String fileId) throws IOException;
    void delete();
}
