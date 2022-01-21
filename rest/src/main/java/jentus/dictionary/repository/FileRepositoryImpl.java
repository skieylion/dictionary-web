package jentus.dictionary.repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Repository
public class FileRepositoryImpl implements FileRepository {

    private final AmazonS3 amazonS3;
    private final String bucketName;

    public FileRepositoryImpl(AmazonS3 amazonS3, @Value("${app.s3.bucketName}") String bucketName) {
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }


    @Override
    public void put(String fileId, MultipartFile multipartFile) throws IOException {
        ObjectMetadata data = new ObjectMetadata();
        data.setContentType(multipartFile.getContentType());
        data.setContentLength(multipartFile.getSize());
        data.setHeader("name", multipartFile.getOriginalFilename());
        amazonS3.putObject(bucketName, fileId, multipartFile.getInputStream(), data);
    }

    @Override
    public InputStream get(String fileId) {
        ObjectListing objectListing = amazonS3.listObjects(bucketName);
        for(S3ObjectSummary os : objectListing.getObjectSummaries()) {
            System.out.println(os.get.getKey());
        }
        S3Object s3Object = amazonS3.getObject(bucketName, fileId);
        return s3Object.getObjectContent();
    }

    @Override
    public void delete() {

    }
}
