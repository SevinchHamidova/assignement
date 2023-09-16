// HTML elementlarni chaqirib olish
let sarlovha = document.querySelector(".savol-js") // savol sarlavhasini chaqirish
let elText = document.querySelectorAll(".variantlar") // variantlar ro'yxatini chaqirish
let javoblar_royxati = document.querySelector(".answer-list") // javoblar ro'yxatini chaqirish
let savollar_soni = document.querySelector('.savollarsoni-js') // qolgan savollar sonini ko'rsatuvchi elementni chaqirish
let vaqt_elem = document.querySelector('.time') // vaqtni ko'rsatuvchi elementni tanlash
let mamlakatlar_massiv = [{}]; // massiv mamlakatlar 

let topilganJavob = 0; // to'g'ri javoblar soni
let savollar = 10; // savollar soni
 
// Mamlakatlar ro'yxatini aralashtirish (shuffle) funksiyasi
shuffle(mamlakatlar_massiv); //Bu funksiya o'z ichida berilgan ro'yxatni aralashtiradi 
function shuffle(arr) { // arr deb nomlangan ro'yxatni qabul qiladi
    let saqlash = arr?.length, // saqlash o'zgaruvchisi ro'yxatdagi elementlar sonini saqlayadi.
    temp,
    random;
    //temp va random o'zgaruvchilari tasodifiy elementlarni almashtirish uchun va while tsikli ichida ishlatiladi.
    while (saqlash > 0) {
        random = Math.floor(Math.random() * saqlash); 
        //random- o'zgaruvchisiga tasodifiy bir raqam tanlanadi 
        
        saqlash--; // o'zgaruvchisi bir kamaytiriladi
        
        temp = arr[saqlash]; //o'zgaruvchiga ro'yxatdagi joriy element saqlanadi
        
        arr[saqlash] = arr[random]; // elementiga tasodifiy tanlangan elementni o'rnatiladi
        
        arr[random] = temp //elementiga temp o'zgaruvchisida saqlangan joriy elementni o'rnatiladi
       
    }
    return arr
}
// Sarlavhani ko'rsatish funksiyasi
function sarlovhali_korsatish (arr) {
    sarlovha.textContent =  arr[0].name.common; // Sarlavha sarlavhasini yangilash
    sarlovha.dataset.id = arr[0].name.common; // Sarlavha sarlavhasining "data-id" atributini yangilash
}
// Variantlarni ko'rsatish funksiyasi
function variantlarni_korsatish(arr) {
    arr.forEach(itm => {
        let newText = document.createElement("p"); // Yangi "p" elementini yaratish
        
        newText.classList.add("text"); // "matn" klassini qo'shish
        
        newText.innerHTML = itm?.capital; // Elementni matni bilan to'ldirish
        newText.dataset.id = itm.name.common; // "data-id" atributini yangilash
        
        javoblar_royxati.appendChild(newText); // Yangi elementni "javoblar-ro'yxati"ga qo'shish
    })
}
// Mamlakatlar ma'lumotlarini olish
async function mamlakatlarni_olish(url) {
    try {
        let rec = await fetch(url); // Ma'lumotlarni internetdan olish
        
        let data = await rec.json(); // Ma'lumotlarni JSON formatiga o'girib olish
        
        // Mamlakatlar ro'yxatini aralashtirish
        shuffle(data);
         // 4 ta variantni tanlang
        let a = data?.splice(0 , 4);
        // Variantlarni ko'rsatish
        variantlarni_korsatish(a);
         // Variantlarni qayta aralashtirish
        shuffle(a);
          // Sarlavhani yangilash
          sarlovhali_korsatish(a);
        
        
    } catch (error) {
        console.log(error); // Xato xabarini konsolga chiqarish
    }
}
// Vaqt intervali
let i = 16;
let myinterval =  setInterval(function(){
    i -= 1; // Vaqtni 1 sekund bilan kamaytirish
    vaqt_elem.innerHTML = i; // Vaqt elementini yangilash
    // Vaqt tugaganda yoki savollar tugaganda
     if(i == 0 || savollar == 0) {
        clearInterval(myinterval) // Vaqt o'tkazgichni to'xtatish
        // Yangi o'yin tugmasini, qutni va matnni yaratish
        let newBtn = document.createElement('button');
        let newBox = document.createElement('div');
        let newText = document.createElement('p')
        // Yangi o'yin tugmasiga matn qo'yish
        newBtn.innerHTML = 'New Game'; // Yangi o'yin tugmasiga matn qo'yish
        // Natija matnini yaratish
        newText.innerHTML = "To'g'ri javoblar soni: " + topilganJavob;// Natija matnini tayinlash
       // Elementlarga klasslar qo'shish
        newBtn.classList = 'buttun-new'; // Yangi tugma klassini tayinlash
        newBox.classList = 'box-new'; // box klassini tayinlash
        newText.classList = 'text-new'; // Yangi matn klassini tayinlash
        // Qutiga tugma va matnni qo'shish
        newBox.appendChild(newBtn);
        newBox.appendChild(newText );
        document.body.appendChild(newBox); // Yangi qutni sahifaga qo'shish
         // Yangi o'yin tugmasini bosganda sahifani qaytarish        
        newBtn.addEventListener('click', function(){
            window.location.reload()
        })
    } 
}, 1000)// Vaqt o'tkazgich intervalini 1 sekundda bir ishga tushurish

// Javob variantlariga bosilganda amal
javoblar_royxati.addEventListener('click', function(evt){
    let target = evt.target; // Bosilgan elementni olish funksiyasi
    console.log(target);
    // Foydalanuvchi variantni tanlaganida
    if(target.dataset.id == sarlovha.textContent){
        // To'g'ri javobni ajratish uchun klass qo'shish

        target.classList.add('green'); // To'g'ri javobni ajratish uchun "yashil" klassini qo'shish

        // Vaqtni qayta boshlash
        i = 16;    
         // To'g'ri javoblar sonini oshirish
        topilganJavob += 1;
        // Qolgan savollar sonini kamaytirish
        savollar -= 1;
        // Qolgan savollar sonini sahifada yangilash
        savollar_soni.innerHTML = savollar;
           // Barcha savollarni to'g'ri javoblarini tekshirish
        if(topilganJavob == 10) {
     
            console.log('galabaa');  // "Galabaa" deb konsolga chiqarish
        }
         // Yangi savollarni olish uchun va sahifani tozalash
        setTimeout(function(){
            mamlakatlarni_olish("https://restcountries.com/v3.1/all") // Mamlakat ma'lumotlarini olish uchun link
            javoblar_royxati.innerHTML = '' // Savollar ro'yxatini bo'shatish
        }, 500)// 0.5 sekunddan so'ng yangi savollarni olish
    } else {
        // Noto'g'ri javobni ajratish uchun klass qo'shish
        target.classList.add('red'); // Notogri javobni ajratish uchun "qizil" klassini qo'shish
        // Vaqtni qayta boshlash
        i = 16;    
        // Qolgan savollar sonini kamaytirish
        savollar -= 1;
        // Qolgan savollar sonini sahifada yangilash
        savollar_soni.innerHTML = savollar; 
         // Yangi savollarni olish uchun va sahifani tozalash
        setTimeout(function(){
            mamlakatlarni_olish("https://restcountries.com/v3.1/all") // Mamlakat ma'lumotlarini olish uchun link
            javoblar_royxati.innerHTML = '' // Savollar ro'yxatini bo'shatish
        }, 500)// 0.5 sekunddan so'ng yangi savollarni olish
    }
})
// O'yinni boshlash
mamlakatlarni_olish("https://restcountries.com/v3.1/all") 
// O'yin boshlang'ich ma'lumotlarini olish uchun link...