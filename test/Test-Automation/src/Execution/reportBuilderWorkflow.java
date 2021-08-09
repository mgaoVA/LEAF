package Execution;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.AssertJUnit;
import org.testng.asserts.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.NoSuchElementException;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;

import Framework.TestData;
import Framework.setupFramework;
import Framework.waitMethods;
import Framework.highlightElement;

public class reportBuilderWorkflow extends setupFramework {

	//private static final DateFormat Calendar = null;
	Date date = new Date();
	
	@BeforeMethod
	@BeforeClass
	public void setUp()  {
		if(driver!= null) {
			driver=getDriver();   //   Also have a valid ChromeDriver here
			//System.out.println("Driver established for: " + driver.getClass());
			//driver.manage().timeouts().wait(Framework.waitMethods.w100);
		}
	}
	

	//Cert test in the event this is starting page for tests
	@Test(priority = 1) //MUST REMAIN #1 ( or zero)
	private void testForCertPage() /*throws InterruptedException */ {
	    try {
	    	//waitMethods.implicitWait(waitMethods.w300);
	    	waitMethods.waiter(waitMethods.w300);
	    	WebElement ele = driver.findElement(By.id("details-button"));  //.click();
	    	highlightElement.highLightElement(driver, ele);
	    	ele.click();

	    	waitMethods.waiter(waitMethods.w300);
	    	
	        WebElement ele2 = driver.findElement(By.partialLinkText("Proceed to localhost")); //.click();
	    	ele2.click();
	        System.out.println("Certificate not found, proceeding to unsecure site");
	    } catch (NoSuchElementException e) {
	        System.out.println("Certificate present, proceeding ");
	    } 
	} 
 
// Report Builder Workflow
	
	@Test(priority = 102) //
	private void clickReportBuilder() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("//*[text()='Report Builder']"));
		// Alternatively:  WebElement ele = driver.findElement(By.xpath("//*[@id=\"bodyarea\"]/div[1]/a[4]/span"));
    	highlightElement.highLightElement(driver, ele);
   		ele.click();
		waitMethods.waiter(waitMethods.w200);
    	System.out.println("Report Builder clicked from home page");
	}
    	
   

	@Test(priority = 104) //
	private void inputTextBox01() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[1]/td[5]/input"));
		//WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[1]/td[4]/input"));
		//WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr/td[5]/input"));
    	highlightElement.highLightElement(driver, ele);
    	waitMethods.waiter(waitMethods.w250);
    	
    	String name = "test";
   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		//ele.sendKeys(Keys.chord(name));
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w200);
    	}
    	
    	System.out.println("Input text to first textbox");			
	}

	
	@Test(priority = 106) //  1st And
	private void selectAnd01() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/button[2]"));
		highlightElement.highLightElement(driver, ele);
   		ele.click();
		waitMethods.waiter(waitMethods.w200);
    	System.out.println("Report Builder clicked first 'and' button");
	}


		
	
	@Test(priority = 108) //
	public void clickServiceButton02() {         
		//waitMethods.implicitWait(waitMethods.w300);
		waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[2]/td[3]/div/a"));
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w200);
		WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[2]/td[3]/div/div/ul/li[2]"));
		highlightElement.highLightElement(driver, ele2);
		ele2.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("Clicked on Service Button Row 2");
	}

	
	@Test(priority = 110) //  1st OR
	private void selectOr01() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/button[3]"));
		highlightElement.highLightElement(driver, ele);
   		ele.click();
		waitMethods.waiter(waitMethods.w200);
    	System.out.println("Report Builder clicked first 'OR' button");
	}

	@Test(priority = 112) //
	public void inputTextBox03() {         
		//waitMethods.implicitWait(waitMethods.w300);
		waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[3]/td[3]/div/a"));
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w200);
		WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[3]/td[3]/div/div/ul/li[2]"));
		highlightElement.highLightElement(driver, ele2);
		ele2.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("Clicked on Service Button Row 3");
	}


	@Test(priority = 114) //
	public void clickServiceButton03() {         
		//waitMethods.implicitWait(waitMethods.w300);
		waitMethods.waiter(waitMethods.w500);			//The below opens the DDL
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[3]/td[5]/div/a"));
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w200);
		WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[3]/td[5]/div/div/ul/li[6]"));
		highlightElement.highLightElement(driver, ele2);
		ele2.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("Selected Facilities Row 3");
	}
	
	
	@Test(priority = 116) //  2nd And
	private void selectAnd02() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/button[2]"));
		highlightElement.highLightElement(driver, ele);
   		ele.click();
		waitMethods.waiter(waitMethods.w200);
    	System.out.println("Report Builder clicked second 'and' button");
	}
	
	
	@Test(priority = 118) //
	public void clickTypeButton01() {         
		//waitMethods.implicitWait(waitMethods.w300);
		waitMethods.waiter(waitMethods.w500);			//The below opens the DDL
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[4]/td[3]/div/a"));
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w200);				//Select Initiator
		WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[4]/td[3]/div/div/ul/li[5]"));
		//WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[4]/td[3]/div/div/ul/li[4]"));
		highlightElement.highLightElement(driver, ele2);
		ele2.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("Selected Initiator");
	}
	
	
	@Test(priority = 120) //
	private void inputTextBox04() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[4]/td[5]/div/div[1]/input"));
    	highlightElement.highLightElement(driver, ele);
    	
    	String name = "Merry, Vittoria";
   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		//ele.sendKeys(Keys.chord(name));
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w200);
    	}
    	
    	System.out.println("Input user name - V. Merry");			
	}

	
	@Test(priority = 122) //  3rd And
	private void selectAnd03() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/button[2]"));
		highlightElement.highLightElement(driver, ele);
   		ele.click();
		waitMethods.waiter(waitMethods.w200);
    	System.out.println("Report Builder clicked third 'and' button");
	}

	
	@Test(priority = 124) //
	public void clickTypeButton02() {         
		//waitMethods.implicitWait(waitMethods.w300);
		waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[5]/td[3]/div/a"));
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w200);				//Select Initiator
		WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[5]/td[3]/div/div/ul/li[7]"));
		highlightElement.highLightElement(driver, ele2);
		ele2.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("Selected Current Status");
	}

	
	
	@Test(priority = 126) //
	public void clickIsNot() {         
		//waitMethods.implicitWait(waitMethods.w300);
		waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[5]/td[4]/div/a"));
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w200);				//Select Initiator
		WebElement ele2 = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/table/tr[5]/td[4]/div/div/ul/li[2]"));
		highlightElement.highLightElement(driver, ele2);
		ele2.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("Selected IS NOT");
	}

	
	@Test(priority = 128) //  
	private void selectNextStep() {
		waitMethods.waiter(waitMethods.w250);       
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div/div[1]/fieldset/button[4]"));
		highlightElement.highLightElement(driver, ele);
   		ele.click();
		waitMethods.waiter(waitMethods.w200);
    	System.out.println("Report Builder selected 'IS NOT'");
	}

/* Values for checkboxes
 * 
 * Service
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[2]/div	
 * 
 * Type of Request
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[3]/div	
 * 
 * Current Status
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[4]/div
 * 
 * Initiator
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[5]/div
 * 
 * 
 * Action Button
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[6]/div
 * 
 * Comment History
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[7]/div
 * 
 * Approval History
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[8]/div
 * 
 * Days since last action
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[9]/div
 * 
 * Days since last Last Step Movement
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[1]/div[10]/div
 * 
 * 
 * 
 * Select Max Test Checkbox
 * /html/body/div[2]/div/div/div[2]/div[2]/div/div[2]/div[1]/div[1]
 * 
 * 
 * 
 * Generate Report
 * ID = generateReport
 * 
 * */	
	
	
	
		
	
	
	////////////   DDL TEMPLATE \\\\\\\\\\\\\\\\\\
//	@Test(priority = 199) //
//	public void DDL_Template() {         
//		//waitMethods.implicitWait(waitMethods.w300);
//		waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
//		WebElement ele = driver.findElement(By.xpath(""));
//		highlightElement.highLightElement(driver, ele);
//		ele.click();
//		waitMethods.waiter(waitMethods.w200);
//		WebElement ele2 = driver.findElement(By.xpath(""));
//		highlightElement.highLightElement(driver, ele2);
//		ele2.click();
//		waitMethods.waiter(waitMethods.w250);
//		System.out.println("");
//	}

	
	
//	@Test(priority = 196) //
//	private void searchByPosition() {
//		waitMethods.waiter(waitMethods.w250);       
//		WebElement ele = driver.findElement(By.id("search"));
//    	//highlightElement.highLightElement(driver, ele);
//    	
//    	String name = "Accountability Officer";
//   
//    	for(int i = 0; i < name.length(); i++) {
//    		char c = name.charAt(i);
//    		String s = new StringBuilder().append(c).toString();
//    		//ele.sendKeys(Keys.chord(name));
//    		ele.sendKeys(s);
//    		waitMethods.waiter(waitMethods.w200);
//    	}
//    	
//    	driver.findElement(By.id("search")).clear();
//    	System.out.println("Search By Position");			
//	}

	
	

	
	
	
	
	
	public String getDate() {
	      String pattern = "MM/dd HH:mm";
	      SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

	      String date = simpleDateFormat.format(new Date());
	      System.out.println(date);
	      
	      return date;
		
		
	}

}  //class
	