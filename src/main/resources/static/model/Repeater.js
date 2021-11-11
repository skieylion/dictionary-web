class Repeater {
    constructor(rep){
        var size=rep?rep.length:0;
        var arr=[];
        for(var j=0;j<size;j++){
            arr.push(Date.parse(rep[j].ts));
        }
        arr.sort(function(a, b){return a - b});
        var last=arr.pop();
        var current=new Date();
        var offset=size>0?(current.getTime()-last)/1000/60:0;
        this.state="repeat";
        this.count=size;

        switch (size) {
            case 0:
                this.state="new"
                break;
            case 1:
                if(offset<30) {
                    this.state="repeated";
                    this.offset=Math.ceil(30-offset);
                    this.unit="мин.";
                }
                break;
            case 2:
                offset=offset/60;
                if(offset<24){
                    this.state="repeated";
                    this.offset=Math.ceil(24-offset);
                    this.unit="ч.";
                }
                break;
            case 3:
                offset=offset/60;
                var week3=24*7*3;
                if(offset<week3){
                    this.state="repeated";
                    this.offset=Math.ceil((week3-offset)/24);
                    this.unit="дн.";
                }
                break;
            case 4:
                offset=offset/60;
                var month3=24*7*4*3;
                if(offset<month3){
                    this.state="repeated";
                    this.offset=Math.ceil((month3-offset)/24);
                    this.unit="дн.";
                }
                break;
            default:
                this.state="studied";
        }
    }
    getInfo(){
        return {
            state:this.state,
            offset:this.offset,
            unit:this.unit
        };
    }
}