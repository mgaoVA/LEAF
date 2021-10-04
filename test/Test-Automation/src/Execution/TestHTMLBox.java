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
import org.openqa.selenium.NoSuchElementException;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.openqa.selenium.support.ui.Select;			//Select Method

import Framework.TestData;
import Framework.setupFramework;
import Framework.waitMethods;
import Framework.highlightElement;

public class TestHTMLBox extends setupFramework {

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
 
// Forms Workflow
	
	
		

		
		@Test(priority = 125) //				  			
		private void Testing() {			//
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.xpath("//*[contains(text(),'AUT')]"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);	
	    	System.out.println("Opening existing form = AUT");
		}		
		
		
		@Test(priority = 130) //	  			
		private void selectEditFieldIcon() {		
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.xpath("//*[contains(text(),'Test Q1')]"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);	
	    	System.out.println("Test Question: Edit Field Icon");
		}
		
		
		
		@Test(priority = 135) //						//  			
		private void selectAdvancedOptions() {			
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("button_advanced"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);	
	    	System.out.println("Select Advanced Options");
		}

		
//		@Test(priority = 140) //						//  			
//		private void scrollDown() {			
//			waitMethods.waiter(waitMethods.w500);       
//			WebElement ele = driver.findElement(By.id("btn_codeSave_htmlPrint"));
//	    	highlightElement.highLightElement(driver, ele);
//	   		//ele.click();
//			waitMethods.waiter(waitMethods.w500);	
//	    	System.out.println("Scroll down");
//		}

		
		
		
		
		
		//  Try: /html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]
		//      /html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div
		//      /html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div/div
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/textarea[1]
		//      #advanced > div:nth-child(7) > div:nth-child(1) > textarea
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[1]/textarea
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[1]/textarea
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div/div
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div/div/div
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div/div/div/div[1]/pre
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div/div/div/div[1]/pre/span
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div
		//		disable_or_delete
		//
		//
		//		/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]
		
		
		//  The non-visible element beside 'save code'	
		//WebElement ele = driver.findElement(By.id("html"));
		
		//Closest so far			/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]
		
		
		
		//						Search Google for   Selenium sendkeys to div
		//							something like:    class = contenteditable
		
		@Test(priority = 188) //				
		private void inputHTMLEditData() {			
			waitMethods.waiter(waitMethods.w250);       
			//WebElement ele = driver.findElement(By.xpath("/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]/div/div/div"));
			WebElement ele = driver.findElement(By.id("html"));
			String strHTML = "HTML Text Here";
			//String strHTML = "<button id=\"button_save\" class=\"usa-button leaf-btn-med\" style=\"border: 2px solid white; "
			//		+ "visibility: visible;\">\r\n"
			//		+ "                        Save\r\n"
			//		+ "                    </button>";
	    	highlightElement.highLightElement(driver, ele);
	    	ele.sendKeys(strHTML);
	    	ele.sendKeys(Keys.TAB);
			waitMethods.waiter(waitMethods.w250);
	    	ele.sendKeys(strHTML);
	    	ele.sendKeys(Keys.TAB);
	    	waitMethods.waiter(waitMethods.w250);
	    	ele.sendKeys(Keys.TAB);
	    	waitMethods.waiter(waitMethods.w250);
	    	
	    	System.out.println("Input HTML-Edit Data");
		}

/*
 
 If all else fails, use xPath: (By.xpath("/html/body/div[3]/div[2]/form/div/main/div/fieldset/textarea[1]"));
 and tab thrice to the editor box
  
 */		
		
		
		
		
//		@Test(priority = 190) //						//  			
//		private void selectSaveCode01() {			
//			waitMethods.waiter(waitMethods.w500);       
//			WebElement ele = driver.findElement(By.id("btn_codeSave_html"));
//	    	highlightElement.highLightElement(driver, ele);
//	   		ele.click();
//			waitMethods.waiter(waitMethods.w500);	
//	    	System.out.println("Select Save Code (1st HTML box)");
//		}

		
		
		@Test(priority = 192) //						//  			
		private void inputHTMLReadData() {			
			waitMethods.waiter(waitMethods.w500);       
			WebElement ele = driver.findElement(By.xpath("/html/body/div[3]/div[2]/form/div/main/div/fieldset/div[2]/div[6]/div[1]"));
			//String strHTML = "<title>Form Editor&nbsp; - Academy Demo Site (Test site) | Washington DC</title>";
			String strHTML = "Non-HTML";
	    	highlightElement.highLightElement(driver, ele);
	   		ele.sendKeys(strHTML);
	   		ele.sendKeys(Keys.ENTER);
			waitMethods.waiter(waitMethods.w500);	
	    	System.out.println("Input HTML-Read Data");
		}
		
		
		
		@Test(priority = 194) //						//  			
		private void selectSaveCode02() {			
			waitMethods.waiter(waitMethods.w500);       
			WebElement ele = driver.findElement(By.id("btn_codeSave_htmlPrint"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w500);	
	    	System.out.println("Select Save Code (2nd HTML box)");
		}
		
		

		
		
		
/*  /////// FORM EDITOR Main Screen Element Locators \\\\\\
					
			
			//////  + Adding New Question \\\\\\\\\\\\\
			 Field Name:				id=  name
			  	Advanced Formatting:	id=  advNameEditor
		  	Short Label:				id=  description
		  	
		  	Input Format (DDL):			id=  indicatorType
		  	
		  	Import Values (Field Types):
		  			value = None:						//Don't use this
		  			value = text				Single line text
		  			value = textarea			Multi-line text	
		  			value = grid				Grid (Table with rows and columns)
		  			value = number				Numeric
		  			value = currency			Currency
		  			value = date				Date
		  			value = radio				Radio (single select, multiple options)
		  			value = checkbox			Checkbox (A single checkbox)
		  			value = checkboxes			Checkboxes (Multiple Checkboxes)
		  			value = multiselect			Multi-Select Dropdown
		  			value = dropdown			Dropdown Menu (single select, multiple options)
		  			value = fileupload			File Attachment
		  			value = image				Image Attachment
		  			value = orgchart_group		Orgchart Group
		  			value = orgchart_position	Orgchart Position
		  			value = orgchart_employee	Orgchart Employee
		  			value = raw_data			Raw Data (for programmers)
		  			
		  			
		  	
		  	Default Answer:				id=  default
		  	
		  	Required:					id=  required
		  	Sensitive:					id=  sensitive
			Sort Priority: 				id=  sort
			
			Save:						id=  button_save
			Cancel:						id=  button_cancelchange
			Advanced Options			id = button_advanced
			
			1st html textbx				xPath = /html/body/div[3]/div[2]/form/div/main/div/fieldset/div[1]/div[6]/div[1]
			Save Code (1st)				id = btn_codeSave_html
			
			2nd html textbx				xPath = /html/body/div[3]/div[2]/form/div/main/div/fieldset/div[2]/div[6]/div[1]
			Save Code (2nd)				id = btn_codeSave_htmlPrint 
			
			
										
	View all forms:	TODO		
	+ Add Internal=Use		CSS = #menu > div:nth-child(4)
	Staple Other Form:		CSS = #menu > div:nth-child(7)
	View History:			CSS = #menu > div:nth-child(11)
	Delete this form:		CSS = #menu > div:nth-child(18)
	Restore Fields:			CSS = #menu > div:nth-child(21)
		

*/			
			
///////////////  Normal Template \\\\\\\\\\\\\\\\\\\\	
//	@Test(priority = 198) //
//	private void clickReportBuilder() {
//		waitMethods.waiter(waitMethods.w250);       
//		WebElement ele = driver.findElement(By.xpath("//*[text()='Report Builder']"));
//    	highlightElement.highLightElement(driver, ele);
//   		ele.click();
//		waitMethods.waiter(waitMethods.w250);
//    	System.out.println("Report Builder clicked from home page");
//	}
//
//		
//////////////DDL SELECT TEMPLATE \\\\\\\\\\\\\\\\\\
//		@Test(priority = 199) //
//		public void methodName() {         
//			//waitMethods.implicitWait(waitMethods.w300);
//			waitMethods.waiter(waitMethods.w200);			//The below opens the DDL
//			WebElement ele = driver.findElement(By.id(""));
//			highlightElement.highLightElement(driver, ele);
//			ele.click();
//			waitMethods.waiter(waitMethods.w250);
//			Select select = new Select(driver.findElement(By.id("")));
//			highlightElement.highLightElement(driver, ele);
//			select.selectByValue("1");
//			waitMethods.waiter(waitMethods.w200);
//			WebElement ele2 = driver.findElement(By.id("indicatorType"));
//			ele2.click();
//			System.out.println("Selected ");
//		}
//		
//		
//		
//
//			
////////////////   DDL TEMPLATE \\\\\\\\\\\\\\\\\\
//	@Test(priority = 199) //
//	public void DDL_Template() {         
//		//waitMethods.implicitWait(waitMethods.w300);
//		waitMethods.waiter(waitMethods.w200);			//The below opens the DDL
//		WebElement ele = driver.findElement(By.xpath(""));
//		highlightElement.highLightElement(driver, ele);
//		ele.click();
//		waitMethods.waiter(waitMethods.w250);
//		WebElement ele2 = driver.findElement(By.xpath(""));
//		highlightElement.highLightElement(driver, ele2);
//		ele2.click();
//		waitMethods.waiter(waitMethods.w200);
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
	