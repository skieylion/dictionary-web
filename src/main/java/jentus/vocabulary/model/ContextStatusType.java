package jentus.vocabulary.model;

public enum ContextStatusType {
    REPEATED(1),STUDIED(2);

    private long statusId;

    ContextStatusType(int statusId) {
        this.statusId=statusId;
    }

    public long getStatusId(){
        return this.statusId;
    }
}
