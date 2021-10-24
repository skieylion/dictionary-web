const Card = {
    data() {
        return {
            counter: 0,
            value:"",
            formType:1,
            meaningDtoList:[{
                photo:undefined,
                exampleDtoList:[{
                    text:""
                }]
            }],
            forms:[
                {
                    "id":1,
                    "name":"noun"
                },
                {
                    "id":2,
                    "name":"verb"
                },
                {
                    "id":3,
                    "name":"adjective"
                }
            ]
        }
    },
    methods:{
        processAudio(event){
            this.audio = event.target.files[0];
            console.log(this.audio);
        },
        processPhotoValue(event,vIndex){
            this.meaningDtoList[vIndex].photo = event.target.files[0];
            console.log(this.meaningDtoList[vIndex].photo);
        },
        processVideoExample(event,vIndex,eIndex){
            this.meaningDtoList[vIndex].exampleDtoList[eIndex].video = event.target.files[0];
            console.log(this.meaningDtoList[vIndex].exampleDtoList[eIndex].video);
        },
        processAudioExample(event,vIndex,eIndex){
            this.meaningDtoList[vIndex].exampleDtoList[eIndex].audio = event.target.files[0];
            console.log(this.meaningDtoList[vIndex].exampleDtoList[eIndex].audio);
        },
        addNewValue(){
            this.meaningDtoList.push({
                exampleDtoList:[{
                    text:""
                }]
            });
        },
        addNewExample(vIndex){
            this.meaningDtoList[vIndex].exampleDtoList.push({
                text:""
            });
        },
        removeValue(vIndex){
            this.meaningDtoList.splice(vIndex,1);
        },
        removeExample(eIndex,vIndex){
            this.meaningDtoList[vIndex].exampleDtoList.splice(eIndex,1);
        },
        save(){
            axios.post("/form",{
               value:this.value,
               typeId:this.formType,
               meta:"{}",
               meaningDtoList:this.meaningDtoList
            }).then((response) => {
            	console.log(response);
            });
        }
    }
}

Vue.createApp(Card).mount('#app_cards');