
const Valid_Entity_Types: ReadonlySet<string> = new Set([
    'LP', 'LL','FC','PF',
    'RF',
    'MQ', 'MM',
    'NB',
    'CC',
    'CS',
    'MB',
    'FM',
    'GS',
    'DP', 'CP', 'NR',
    'CM', 'CD', 'MD', 'HS', 'VH',
    'CH', 'MH', 'CL', 'XL', 'CX', 'HC',
    'RP', 
    'TU', 
    'TC', 
    'FB', 'FN', 
    'PA', 'PB', 
    'SS', 
    'MC', 'SM',
    'GA', 'GB'
]);

export function isValidUEN(uen: string): boolean {
    const cleanedUEN = uen.trim().toUpperCase();
    if (cleanedUEN.length > 10 || cleanedUEN.length < 9) {
        return false;
    }
    const NineDigitUENPattern = /^\d{8}[A-Z]$/;
    const TenDigitUENPattern = /^\d{4}\d{5}[A-Z]$/;
    const TenDigitUENWithEntityTypePattern = /^([TSR])(\d{2})([A-Z]{2})(\d{4})([A-Z])$/;
    if (NineDigitUENPattern.test(cleanedUEN)) {
        //8 digits followed by a letter
        //nnnnnnnnX (9 digits) e.g. 12345678A  
        return true;
    } else if (TenDigitUENPattern.test(cleanedUEN)) {
        //4 digits followed by 5 digits and a letter
        //yyyynnnnnX (10 digits) e.g. 199012345X 
        return true;
    } else if (TenDigitUENWithEntityTypePattern.test(cleanedUEN)) {
        const match = TenDigitUENWithEntityTypePattern.exec(cleanedUEN);
        if (!match) {
            return false;
        }
        const entityType = match[3];
        if (!Valid_Entity_Types.has(entityType)) {
            return false;
        }
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