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

import Framework.TestData;
import Framework.setupFramework;
import Framework.waitMethods;
import Framework.highlightElement;

public class createNewRequest extends setupFramework {

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
 
//create New Request Workflow
	
	@Test(priority = 202) //
	public void selectNewRequest() {         //
		//waitMethods.implicitWait(waitMethods.w300);
		//waitMethods.waiter(waitMethods.w1k);	
		WebElement ele = driver.findElement(By.xpath("//*[@id=\"bodyarea\"]/div[1]/a[1]/span")); 
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("New Request Button clicked");
	}


	
	@Test(priority = 204) 					//select drop down
	private void selectService() {
		waitMethods.waiter(waitMethods.w200);       
		WebElement ele = driver.findElement(By.cssSelector("#service_chosen > a > span"));
	    highlightElement.highLightElement(driver, ele);
	    ele.click();
		waitMethods.waiter(waitMethods.w200);
	    System.out.println("Clicked Service Drop down menu");
	} 


	
	
	@Test(priority = 206) // 
	private void selectServiceAcuteCare() {			//Acute Care
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.cssSelector("#service-chosen-search-result-1")); //.click(); 
		highlightElement.highLightElement(driver, ele);
        ele.click();
		waitMethods.waiter(waitMethods.w250);
        System.out.println("Selected Service 'Acute Care'");
} 

	//#priority_chosen > a > span	
	
	@Test(priority = 208) 						//select drop down
	private void selectRequestPriority() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.cssSelector("#priority_chosen > a > span")); 
	    highlightElement.highLightElement(driver, ele);
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
		//driver.navigate().back();    //navigate back
	    System.out.println("Checked priority values in DDL");
	} 


	@Test(priority = 210) 					//select Normal Priority
	private void selectRequestNormalPriority() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.cssSelector("#priority_chosen > a > span")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
		//driver.navigate().back();    //navigate back
	    System.out.println("Select Request Normal Priority");
	} 

	
	
	
	
    
	@Test(priority = 212) //
	private void inputRequestTitle() {
		//waitMethods.implicitWait(waitMethods.w300);	
			
		waitMethods.waiter(waitMethods.w300);
		WebElement ele = driver.findElement(By.name("title")); //.click();  
	    highlightElement.highLightElement(driver, ele);

    	String name = "Test Automation " + getDate().toString();
    	   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w50);
    	}
	   
		waitMethods.waiter(waitMethods.w250);
	    System.out.println("Input Request Title: 'Test Automation");
	} 

	

	@Test(priority = 214) //
	private void selectMRTestChkBox() {					  
		WebElement ele = driver.findElement (By.xpath ("//*[contains(text(),'MR - Test')]"));       
		//WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/form/div[2]/div[2]/div/div[2]/span/div[12]"));
	    highlightElement.highLightElement(driver, ele);
	    waitMethods.waiter(waitMethods.w300);
	    ele.click();   
	    waitMethods.waiter(waitMethods.w300);
	    System.out.println("Selected MR - Test Checkbox");
	} 

	

	@Test(priority = 216) 
	private void selectClickToProceedButton() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.xpath("//*[@id=\"record\"]/div[2]/div[2]/div/div[3]/button")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
	    System.out.println("Clicked Click to Proceed button");
	} 

	
	@Test(priority = 218)
	public void cancelRequest()  {   //
		//waitMethods.implicitWait(waitMethods.w300);
    	//waitMethods.waiter(waitMethods.w200);
    	WebElement ele = driver.findElement(By.cssSelector("#tools > button"));
    	highlightElement.highLightElement(driver, ele);
    	ele.click();
    	waitMethods.waiter(waitMethods.w200);			
		System.out.println("Request cancelled");			
	}


	//Yes = confirm_button_save  <--Reference only   Not used in this test
	@Test(priority = 220)
	public void confirmCancelNo()  {   //
		//waitMethods.implicitWait(waitMethods.w300);
    	//waitMethods.waiter(waitMethods.w200);
    	WebElement ele = driver.findElement(By.id("confirm_button_cancelchange"));
    	highlightElement.highLightElement(driver, ele);
    	ele.click();
    	waitMethods.waiter(waitMethods.w200);			
		System.out.println("Confirm cancel -> No");			
	}

	@Test(priority = 222)
	public void cancelRequest2()  {   //
		//waitMethods.implicitWait(waitMethods.w300);
    	//waitMethods.waiter(waitMethods.w200);
    	WebElement ele = driver.findElement(By.cssSelector("#tools > button"));
    	highlightElement.highLightElement(driver, ele);
    	ele.click();
    	waitMethods.waiter(waitMethods.w200);			
		System.out.println("Request cancelled (2)");			
	}

	
	//Yes = 
	@Test(priority = 224)
	public void confirmCancelYes()  {   //We're testing the cancel button - will then begin the request again
		//waitMethods.implicitWait(waitMethods.w300);
    	//waitMethods.waiter(waitMethods.w200);
    	WebElement ele = driver.findElement(By.id("confirm_button_save"));
    	highlightElement.highLightElement(driver, ele);
    	ele.click();
    	waitMethods.waiter(waitMethods.w300);			
		System.out.println("Confirm cancel -> No");			
	}

	
	//Return home and start again
	@Test(priority = 226)
	public void returnToHomePage()  {   //
		//waitMethods.implicitWait(waitMethods.w300);
    	waitMethods.waiter(waitMethods.w200);
    	WebElement ele = driver.findElement(By.partialLinkText("Main Page"));
    	highlightElement.highLightElement(driver, ele);
    	ele.click();
    	waitMethods.waiter(waitMethods.w200);			
		System.out.println("Return to home page");			
	}

	//=============================================================
	
	
	@Test(priority = 228) //
	public void selectNewRequest2() {         
		//waitMethods.implicitWait(waitMethods.w300);
		//waitMethods.waiter(waitMethods.w1k);	
		WebElement ele = driver.findElement(By.xpath("//*[@id=\"bodyarea\"]/div[1]/a[1]/span")); 
		highlightElement.highLightElement(driver, ele);
		ele.click();
		waitMethods.waiter(waitMethods.w250);
		System.out.println("New Request Button clicked (2)");
	}


	
	@Test(priority = 230) //
	private void selectService2() {
		waitMethods.waiter(waitMethods.w300);       
		WebElement ele = driver.findElement(By.cssSelector("#service_chosen > a > span"));
	    highlightElement.highLightElement(driver, ele);
	    ele.click();
		waitMethods.waiter(waitMethods.w300);
	    System.out.println("Clicked Service Drop down menu (2)");
	} 


	
	
	@Test(priority = 232) // 
	private void selectServiceAcuteCare2() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.cssSelector("#service-chosen-search-result-1")); //.click(); 
		highlightElement.highLightElement(driver, ele);
        ele.click();
		waitMethods.waiter(waitMethods.w250);
        System.out.println("Selected Service 'Acute Care' (2)");
} 

	
	@Test(priority = 234) //
	private void selectRequestPriority2() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.cssSelector("#priority_chosen > a > span")); 
	    highlightElement.highLightElement(driver, ele);
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
		//driver.navigate().back();    //navigate back
	    System.out.println("Selected priority DDL (2)");
	} 


	@Test(priority = 236) 
	private void selectRequestNormalPriority2() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.cssSelector("#priority_chosen > a > span")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
		//driver.navigate().back();    //navigate back
	    System.out.println("Select Request Normal Priority (2)");
	} 

	
	
	
	@Test(priority = 238) //
	private void inputRequestTitle2() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.name("title")); //.click();  
	    highlightElement.highLightElement(driver, ele);

    	String name = "Test Automation " + getDate().toString();
    	   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		//ele.sendKeys(Keys.chord(name));
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w50);
    	}
	    
	    System.out.println("Input Request Title: 'Test Automation (2)");
	} 


	
	@Test(priority = 240) //
	private void selectMRTestChkBox2() {
		WebElement ele = driver.findElement (By.xpath ("//*[contains(text(),'MR - Test')]"));
		//WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/form/div[2]/div[2]/div/div[2]/span/div[12]"));
		highlightElement.highLightElement(driver, ele);
	    waitMethods.waiter(waitMethods.w250);
	    ele.click();   
	    waitMethods.waiter(waitMethods.w250);
	    System.out.println("Selected MR - Test Checkbox");
	}
	

	

	@Test(priority = 242) 
	private void selectClickToProceedButton2() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.xpath("//*[@id=\"record\"]/div[2]/div[2]/div/div[3]/button")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w500);
	    System.out.println("Clicked Click to Proceed button (2)");
	} 

	
	

	
	@Test(priority = 246) 
	private void enterFirstAndLastName() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.id("2")); 
	    highlightElement.highLightElement(driver, ele);     

    	String name = "Test Automation";
    	   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		//ele.sendKeys(Keys.chord(name));
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w50);
    	}
		
	    System.out.println("Entered First and Last Name");
	} 
	
	

	@Test(priority = 248) 
	private void enterMiddleInitial() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.id("3")); 
	    highlightElement.highLightElement(driver, ele);     

    	String name = "Q";
    	   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		//ele.sendKeys(Keys.chord(name));
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w50);
    	}
	    
	    System.out.println("Entered Middle Initial");
	} 
	
	
	
	@Test(priority = 250) 
	private void selectNextQuestion2() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.id("nextQuestion2")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
	    System.out.println("Clicked Next Question");
	} 
					
	
	@Test(priority = 252) 
	private void selectThirdQuestion() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w500);			
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/form/div/div/div/div/div[2]/span/div[1]")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
	    System.out.println("Answered Third Question");
	} 

	
	@Test(priority = 254) 
	private void selectNextQuestion() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);
		WebElement ele = driver.findElement(By.id("nextQuestion2")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
	    System.out.println("Selected 'Next Question' (3)");
	} 

	
	@Test(priority = 256) 
	private void selectSubmitRequest() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w2k);	//   
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/button")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
		waitMethods.waiter(waitMethods.w250);
	    System.out.println("Selected 'Submit Request'");
	} 


	@Test(priority = 258) 
	private void enterRequestComment() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w1k);	    //
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[1]/div[3]/div/form/div[2]/textarea")); 
	    highlightElement.highLightElement(driver, ele);     

    	String name = "Automated Test Comment";
    	   
    	for(int i = 0; i < name.length(); i++) {
    		char c = name.charAt(i);
    		String s = new StringBuilder().append(c).toString();
    		//ele.sendKeys(Keys.chord(name));
    		ele.sendKeys(s);
    		waitMethods.waiter(waitMethods.w50);
    	}
	    
	     System.out.println("Request Comment Added");
	} 


	@Test(priority = 260) 					//
	private void selectAcceptJob() {
		//waitMethods.implicitWait(waitMethods.w300);	
		waitMethods.waiter(waitMethods.w250);		//
		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[1]/div[3]/div/form/div[2]/div/button")); 
	    highlightElement.highLightElement(driver, ele);     
	    ele.click();
	    System.out.println("selected 'Accept Job'");
	} 

	
//		DAMM DELINTER
//		waitMethods.waiter(waitMethods.w250);				//
//		WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[1]/div[3]/div/form/div[2]/div/button"));
//		//WebElement ele = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/button")); 
//	    highlightElement.highLightElement(driver, ele);     
//   		waitMethods.waiter(waitMethods.w100);
//	    System.out.println("selected 'Accept Job'");
//	} 



	public String getDate() {
	      String pattern = "MM/dd HH:mm";
	      SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

	      String date = simpleDateFormat.format(new Date());
	      System.out.println(date);
	      
	      return date;
		
		
	}

}  //class
	