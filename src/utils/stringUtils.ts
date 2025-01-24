/**  
 * Capitalizes the first letter of each word in a string.  
 * @param str The input string to capitalize.  
 * @returns The capitalized string.  
 */  
export const capitalizeWords = (str: string): string => {  
    return str  
        .toLowerCase() // Convert the entire string to lowercase  
        .split(' ') // Split the string into words  
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word  
        .join(' '); // Join the words back into a single string  
};  
