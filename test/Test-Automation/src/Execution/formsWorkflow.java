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

public class formsWorkflow extends setupFramework {

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
	
	

		@Test(priority = 102) //
		private void clickCreateForm() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("createFormButton"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
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
	    	
	    	//driver.findElement(By.id("search")).clear();
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
	    	
	    	System.out.println("Populate Form Description");			
		}
		
		
		@Test(priority = 108) //
		private void selectCancel() {
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("button_cancelchange"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
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
			WebElement ele = driver.findElement(By.id("button_save"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms - clicked Save");
		}

	////// Form Created w Title: Automation Test Description + getDate().toString();
		
		
		@Test(priority = 118) //
		private void selectEditProperties() {
			waitMethods.waiter(waitMethods.w250);       
			//WebElement ele = driver.findElement(By.xpath("//*[text()='Edit Properties']"));
			WebElement ele = driver.findElement(By.id("editFormData"));
 	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms - clicked Edit Properties");
		}

		
		@Test(priority = 120) //
		public void selectWorkflow() {         
			//waitMethods.implicitWait(waitMethods.w300);
			waitMethods.waiter(waitMethods.w250);			//The below opens the DDL
			WebElement ele = driver.findElement(By.id("workflowID"));
			highlightElement.highLightElement(driver, ele);
			ele.click();
			waitMethods.waiter(waitMethods.w250);
			Select select = new Select(driver.findElement(By.id("workflowID")));
			highlightElement.highLightElement(driver, ele);
			select.selectByValue("76");
			waitMethods.waiter(waitMethods.w250);
			System.out.println("Forms-Selected Workflow");
		}
		

		
		@Test(priority = 122) //
		public void selectNeedToKnow() {         
			//waitMethods.implicitWait(waitMethods.w300);
			waitMethods.waiter(waitMethods.w200);			//The below opens the DDL
			WebElement ele = driver.findElement(By.id("needToKnow"));
			highlightElement.highLightElement(driver, ele);
			ele.click();
			waitMethods.waiter(waitMethods.w250);
			Select select = new Select(driver.findElement(By.id("needToKnow")));
			highlightElement.highLightElement(driver, ele);
			select.selectByValue("0");
			waitMethods.waiter(waitMethods.w200);
			System.out.println("Forms-Selected Need to Know");
		}


		
		@Test(priority = 124) //
		public void selectAvailability() {         
			//waitMethods.implicitWait(waitMethods.w300);
			waitMethods.waiter(waitMethods.w200);			//The below opens the DDL
			WebElement ele = driver.findElement(By.id("visible"));
			highlightElement.highLightElement(driver, ele);
			ele.click();
			waitMethods.waiter(waitMethods.w250);
			Select select = new Select(driver.findElement(By.id("visible")));
			highlightElement.highLightElement(driver, ele);
			select.selectByValue("1");
			waitMethods.waiter(waitMethods.w200);
			System.out.println("Forms-Selected Availability");
		}

		

		
		@Test(priority = 126) //  Accepts pos & neg integers - not sure what it does though...
		private void selectSortPriority() {			// Leaving Blank for now
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("sort"));
	    	highlightElement.highLightElement(driver, ele);
	   		//ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Sort Priority");
		}
		
		
		@Test(priority = 128) //
		public void selectType() {         
			//waitMethods.implicitWait(waitMethods.w300);
			waitMethods.waiter(waitMethods.w200);			//The below opens the DDL
			WebElement ele = driver.findElement(By.id("formType"));
			highlightElement.highLightElement(driver, ele);
			ele.click();
			waitMethods.waiter(waitMethods.w250);
			Select select = new Select(driver.findElement(By.id("formType")));
			highlightElement.highLightElement(driver, ele);
			//select.selectByValue("Standard");		
			select.selectByIndex(0);			//0= Standard; 1=Parallel Processing   (I suppose??)
			waitMethods.waiter(waitMethods.w200);
			System.out.println("Forms-Selected Type");
		}

/*		
 		Need to come back and add: 
 		- Pete's test for Parallel Processing
		Index: 1=Parallel Process	
*/		
		
		
		@Test(priority = 130) //  
		private void selectSaveProperties() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("button_save"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Save (Properties)");
		}

		
		@Test(priority = 132) //  
		private void selectEditCollaborators() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("editFormPermissions"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Edit Collaborators)");
		}

		
		
		@Test(priority = 134) //  
		private void selectAddGroup() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.xpath("//*[text()='Add Group']"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Add Group)");
		}
		
		
		@Test(priority = 136) //  
		private void selectAddCollaborators() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("groupID"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Add Collaborators)");
			Select select = new Select(driver.findElement(By.id("groupID")));
			highlightElement.highLightElement(driver, ele);
			select.selectByValue("54");
			waitMethods.waiter(waitMethods.w250);
			System.out.println("Forms-Selected CPAC Exec 1");
		}
		
		
		@Test(priority = 138) //  
		private void selectSaveCollaborators() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("button_save"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Save Collaborators)");
		}
		
			
		
		@Test(priority = 140) //  
		private void closeCollaborators() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.xpath("/html/body/div[5]/div[1]/button/span[1]"));    
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Close Collaborators)");
		}

		
		@Test(priority = 142) //  
		private void selectEditCollaborators2() {	
			selectEditCollaborators();
		}
		
		
		
		@Test(priority = 144) //  
		private void selectRemoveCollaborators() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.linkText("Remove"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Remove Collaborators)");
		}
		
		
		@Test(priority = 146) //  
		private void selectAddGroup2() {	
			selectAddGroup();
		}
		
		

		@Test(priority = 148) //  
		private void selectAddCollaborators2() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.id("groupID"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected Add Collaborators)");
			Select select = new Select(driver.findElement(By.id("groupID")));
			highlightElement.highLightElement(driver, ele);
			select.selectByValue("16");
			waitMethods.waiter(waitMethods.w250);
			System.out.println("Forms-Selected Approval Group (Washington DC)");
		}
	
		
		
		@Test(priority = 150) //  
		private void selectSaveCollaborators2() {	
			selectSaveCollaborators();
		}
			
		
		
		@Test(priority = 152) //  
		private void closeCollaborators2() {	
			closeCollaborators();
		}	
		
	
	//////// Adding New Question Sub-Form \\\\\\\\   	
		
		@Test(priority = 154) //  
		private void selectAddSectionHeading() {	
			waitMethods.waiter(waitMethods.w250);       
			WebElement ele = driver.findElement(By.cssSelector("#formEditor_form > div > div"));
	    	highlightElement.highLightElement(driver, ele);
	   		ele.click();
			waitMethods.waiter(waitMethods.w250);
	    	System.out.println("Forms-Selected +Add Section Heading)");
		}
		
		
		 //Pickup Here	
		
//		**Perform a cancel early on
		
//==========================================		
		
//		@Test(priority = 198) //  
//		private void closeEditCollaborators() {	
//			waitMethods.waiter(waitMethods.w250);       
//			WebElement ele = driver.findElement(By.xpath("/html/body/div[5]/div[1]/button/span[1]"));    
//	    	highlightElement.highLightElement(driver, ele);
//	   		ele.click();
//			waitMethods.waiter(waitMethods.w250);
//	    	System.out.println("Forms-Selected Edit Collaborators)");
//		}


		
		
		
		
		
/*  /////// FORM EDITOR Main Screen Element Locators \\\\\\
							
	View all forms:	TODO		
	+ Add Internal=Use		CSS = #menu > div:nth-child(4)
	Staple Other Form:		CSS = #menu > div:nth-child(7)
	View History:			CSS = #menu > div:nth-child(11)
	Delete this form:		CSS = #menu > div:nth-child(18)
	Restore Fields:			CSS = #menu > div:nth-child(21)
							
			
			//////  + Adding New Question \\\\\\\\\\\\\
			 Field Name:				id=  name
			  	Advanced Formatting:	id=  advNameEditor
		  	Short Label:				id=  description
		  	
		  	Input Format (DDL):			id=  indicatorType
		  	
		  	Import Values (Field Types):
		  			value = None:						//Don't use this
		  			value = text				Single line text:  	
		  			value = textarea			Multi-line text:	
		  			value = grid				Grid (Table with rows and columns)		
		  			value = number				Numeric:			
		  			value = currency			Currency:			
		  			value = date				Date:				
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

*/			
			
///////////////  Normal Template \\\\\\\\\\\\\\\\\\\\	
//	@Test(priority = 102) //
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
//    		waitMethods.waiter(waitMethods.w250);
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
	