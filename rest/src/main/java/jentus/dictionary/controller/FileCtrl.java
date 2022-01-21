package jentus.dictionary.controller;

import jentus.dictionary.repository.FileRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("http://localhost:3000")
@RestController
@AllArgsConstructor
public class FileCtrl {

    private final FileRepository fileRepository;

    @PostMapping(value = "/File/{fileId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public void upload(@PathVariable("fileId") String fileId, @RequestPart("file") MultipartFile multipartFile) throws IOException {
        //System.out.println("file");
        fileRepository.put(fileId, multipartFile);
    }

    @GetMapping("/filetest")
    public void list() throws IOException {
        fileRepository.get("asd");
    }
}
