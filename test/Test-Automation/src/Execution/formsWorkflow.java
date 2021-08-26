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
import java.util.concurrent.TimeUnit;

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

public class formsWorkflow extends setupFramework {

	//private static final DateFormat Calendar = null;
	Date date = new Date();
	
	@BeforeMethod
	@BeforeClass
	public void setUp()  {
		if(driver!= null) {
			driver=getDriver();   //   Also have a valid ChromeDriver here
			System.out.println("Driver established for: " + driver.getClass());
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
 
// Forms Workflow
	
	

		@Test(priority = 102) //
		private void clickCreateForm() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("createFormButton"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w50);
	    	System.out.println("Forms - clicked Create Form");
		}
		
		
		@Test(priority = 104) //
		private void inputFormLabel() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("name"));
	    	//highlightElement.highLightElement(driver, ele);
	    	
	    	String name = "Automation Test Form";
	   
	    	for(int i = 0; i < name.length(); i++) {
	    		char c = name.charAt(i);
	    		String s = new StringBuilder().append(c).toString();
	    		//ele.sendKeys(Keys.chord(name));
	    		ele.sendKeys(s);
	    		waitMethods.waiter(waitMethods.w50);
	    	}
	    	
	    	driver.findElement(By.id("search")).clear();
	    	System.out.println("Input Form Label");			
		}


		@Test(priority = 106) //
		private void inputFormDesc() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("description"));
	    	//highlightElement.highLightElement(driver, ele);
	    	
	    	String name = "Automation Test Description " + getDate().toString();
	   
	    	for(int i = 0; i < name.length(); i++) {
	    		char c = name.charAt(i);
	    		String s = new StringBuilder().append(c).toString();
	    		ele.sendKeys(s);
	    		waitMethods.waiter(waitMethods.w50);
	    	}
	    	
	    	driver.findElement(By.id("search")).clear();
	    	System.out.println("Populate Form Description");			
		}
		
		
		@Test(priority = 108) //
		private void selectCancel() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("button_cancelchange"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w50);
	    	System.out.println("Forms - clicked Cancel");
		}


		@Test(priority = 110) //
		private void clickCreateForm02() {
			clickCreateForm();
			System.out.println("Forms - clicked Create Form");
		}
		
		
		@Test(priority = 112) //
		private void inputFormLabel02() {
			inputFormLabel();
			System.out.println("Input Form Label");			
		}


		@Test(priority = 114) //
		private void inputFormDesc02() {
			inputFormDesc();
			System.out.println("Populate Form Description");			
		}
		
		
		@Test(priority = 116) //
		private void selectSave() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("button_cancelchange"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w50);
	    	System.out.println("Forms - clicked Save");
		}


		
		
		
/*

	

			
*/			
			
///////////////  Normal Template \\\\\\\\\\\\\\\\\\\\	
//	@Test(priority = 102) //
//	private void clickReportBuilder() {
//		waitMethods.waiter(waitMethods.w250);       
//		WebElement ele = driver.findElement(By.xpath("//*[text()='Report Builder']"));
//    	highlightElement.highLightElement(driver, ele);
//   		ele.click();
//		waitMethods.waiter(waitMethods.w50);
//    	System.out.println("Report Builder clicked from home page");
//	}
//
//
//			
////////////////   DDL TEMPLATE \\\\\\\\\\\\\\\\\\
//	@Test(priority = 199) //
//	public void DDL_Template() {         
//		//waitMethods.implicitWait(waitMethods.w300);
//		waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
//		WebElement ele = driver.findElement(By.xpath(""));
//		highlightElement.highLightElement(driver, ele);
//		ele.click();
//		waitMethods.waiter(waitMethods.w50);
//		WebElement ele2 = driver.findElement(By.xpath(""));
//		highlightElement.highLightElement(driver, ele2);
//		ele2.click();
//		waitMethods.waiter(waitMethods.w250);
//		System.out.println("");
//	}
//
//	
//	
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
//    		ele.sendKeys(s);
//    		waitMethods.waiter(waitMethods.w50);
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
	