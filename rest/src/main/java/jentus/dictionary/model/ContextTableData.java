package jentus.dictionary.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContextTableData {
    @JsonProperty("DT_RowId")
    private String rowId;
    private String checkbox;
    private String word;
    private String typeOf;
    private String def;
    private String examples;
    private String status;
}
