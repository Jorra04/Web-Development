import java.util.*;
public class parsePrerequisites{

     public static void main(String []args){
        String str = "LE/EECS 2030 3.00 or LE/EECS 1030 3.00; LE/EECS 2011 3.00; SC/MATH 1090 3.00; LE/EECS 2031 3.00 or LE/EECS 2032 4.00.";
        str = str.replaceAll("(\\d\\.\\d\\d|\\d\\.\\d)|\\.","").trim();
        String[] courses = str.split(",|or|and|;");
        String finalJSON = "";
        for(int i = 0; i < courses.length; i ++){
            if(i != courses.length -1){
                finalJSON += "\"" + courses[i].trim() + "\",\n";
            }
            else {
                finalJSON += "\"" + courses[i].trim() + "\"";
            }
        }
        
        System.out.println(finalJSON);
     }
}