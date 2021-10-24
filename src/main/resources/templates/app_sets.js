const Sets = {
    data() {
        return {
            currentId:undefined,
            currentName:"",
            currentDescription:"",
            sets:[
                {
                    name:"A1",
                    date:"07/02/1994",
                    actions:[
                        {
                            title:"edit"
                        },
                        {
                            title:"delete"
                        }
                    ]
                }
            ]
        }
    },
    beforeMount(){
        this.getAll();
    },
    methods:{
        getAll(){
            axios.get("/sets")
            .then((response) => {
                console.log(response);
                this.sets=[];
                let data=response.data;
                if(data&&data.length>0){
                    for(var i=0;i<data.length;i++){
                        var s=data[i];
                        this.sets.push({
                            id:s.id,
                            name:s.name,
                            description:s.description,
                            date:"01/01/2021",
                            actions:[
                                {
                                    title:"edit"
                                },
                                {
                                    title:"delete"
                                }
                            ]
                        });
                    }
                }
            });
        },
        save() {
            let input={
                name:this.currentName,
                description:this.currentDescription
            }
            if(this.currentId){
                input.id=this.currentId
            }

            axios.post("/sets",input).then((response) => {
                this.getAll();
                this.currentName="";
                this.currentDescription="";
                this.currentId=undefined;
            });
        },
        remove(id){
            let f=this.getAll;
            axios.delete("/sets/"+id).then((response) => {
                console.log(response);
                f();
            });
        },
        actionClick(title,rIndex){
            let s=this.sets[rIndex];
            if(title=="edit") {
                this.currentName=s.name;
                this.currentDescription=s.description;
                this.currentId=s.id;
            } else if(title=="delete"){
                this.remove(s.id);
            }
            console.log(title);
        }
    }
}

Vue.createApp(Sets).mount('#app_sets');