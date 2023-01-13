import axios from "axios";
import { defineStore } from "pinia"; 
import { ref,computed } from "vue";

export const cha_store = defineStore('cha_store', () => {
    const setClient = ref(Object);
    const user = ref(Object);
    const channels = ref(null);
    const client = computed(() => {
        setClient.value = new TalkPlus.Client({appId: 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0'});
    });
    console.log(client);

    const login2 = computed(()=>{
        if (client.isLoggedIn()) {
            console.log("로그인햇다");
        }
        else{
            console.log("로그인 안 했다.");
         
        }

        return 11;
    })

    return {client, login2}
});