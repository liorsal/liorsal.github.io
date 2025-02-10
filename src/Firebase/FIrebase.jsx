import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import dayjs from 'dayjs';

class Firebase {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyDXnEOkXJCHIhwPKG3EeTNJ90gNeiw8V0k",
            authDomain: "form-19562.firebaseapp.com",
            databaseURL: "https://form-19562-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "form-19562",
            storageBucket: "form-19562.firebasestorage.app",
            messagingSenderId: "430194777439",
            appId: "1:430194777439:web:9bfdcf8f26bdc6cf932aea"
        };
        this.app = initializeApp(this.firebaseConfig);
        // init real time database
        this.rltdb = getDatabase(this.app);
        this.data = {};
        this.date = dayjs().format('YYYY-MM-DD HH:mm');
    }

    // send data to real time database
    sendData = (data) => {
        set(ref(this.rltdb, `Forms/${this.date}`),data 
    )
            .then(() => {
                console.log('Data sent');
            })
            .catch((error) => {
                console.error('Error sending data: ', error);
            });
    }
}

const fire = new Firebase();
export default fire;