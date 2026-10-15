

export function isValidUEN(uen: string): boolean {
    const cleanedUEN = uen.trim().toUpperCase();
    if (cleanedUEN.length > 10 || cleanedUEN.length < 9) {
        return false;
    }
    if (/^\d{8}[A-Z]$/.test(cleanedUEN)) {
        //8 digits followed by a letter
        //nnnnnnnnX (9 digits) e.g. 12345678A  
        return true;
    } else if (/^\d{4}\d{5}[A-Z]$/.test(cleanedUEN)) {
        //4 digits followed by 5 digits and a letter
        //yyyynnnnnX (10 digits) e.g. 199012345X 
        return true;
    } else if (/^[TSR]\d{2}[A-Z]{2}\d{4}[A-Z]$/.test(cleanedUEN)) {
        /*TyyPQnnnnX (10 digits) 
        Where: 
        T = 20
        S = 19
        R = 18
        Tyy = year of issuance 
        PQ = type of entities 
        n = running number 
        X = check alphabet 
        e.g. T08LL1234A*/
        return true;
    }
    return false;    
}