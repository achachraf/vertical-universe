

export const intToAr = (num)=>{
    const numbers = ["الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر"];
    if(num<10 && num>0) return numbers[num-1];
    return null;
}

export const titleAr = title=>{
    switch (title) {
        case "JahimAlJannah":
            return "جحيم الجنة"
        case "HayatoMayet":
            return "حياة ميت"
        case "AlfosolAlKhamsa":
            return "الفصول الخمسة"
        case "NouronMo3tim":
            return "نور معتم"
        default:
            return "رابط القصة";
    }
}

export const completeTitle = (title,chapter)=>{
    let string = titleAr(title);
    string += " : الفصل "
    string += intToAr(chapter);
    return string;
}

export const btnColor = (story)=>{
    switch(story){
        case "JahimAlJannah":
            return "tempting-azure-gradient";
        case "HayatoMayet":
            return "purple-gradient";
        case "AlfosolAlKhamsa":
            return "peach-gradient";
        case "NouronMo3tim":
            return "young-passion-gradient"
        default :
            return "invalid story"
    }
}
export const colors = (story)=>{
    switch(story){
        case "JahimAlJannah":
            return "green";
        case "HayatoMayet":
            return "purple";
        case "AlfosolAlKhamsa":
            return "orange";
        case "NouronMo3tim":
            return "red"
        default :
            return "invalid story"
    }
}

export const checkStory = (story)=>{
    return ["JahimAlJannah","HayatoMayet","AlfosolAlKhamsa","NouronMo3tim"].includes(story)
}
export const checkChapter = (story,chapter)=>{
    switch(story){
        case "JahimAlJannah":
            return chapter<=6;
        case "HayatoMayet":
            return chapter<=7;
        case "AlfosolAlKhamsa":
            return chapter<=2;
        case "NouronMo3tim":
            return chapter<=4;
        default :
            return null
    }
}