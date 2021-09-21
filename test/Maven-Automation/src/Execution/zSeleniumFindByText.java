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

public class zSeleniumFindByText extends setupFramework {
	
	@BeforeMethod
	@BeforeClass
	public void setUp()  {
		if(driver!= null) {
			driver=getDriver();   //   Also have a valid ChromeDriver here
			//System.out.println("Driver established for: " + driver.getClass());
			//driver.manage().timeouts().wait(Framework.waitMethods.w100);
			waitMethods.waiter(waitMethods.w100);
		}
	}
	//Test Selenium contains(text) method
	
	
	@Test(priority = 214) //
	private void selectMRTestChkBox() {
		
		WebElement ele = driver.findElement (By.xpath ("//*[contains(text(),'Get started ')]"));
		//WebElement ele = driver.findElement(By.xpath("//*[contains(text()='Get started fr']"));
		//WebElement ele = driver.findElement(By.xpath("//*[contains(text(), ‘MR - Test’ )]")); 
	    highlightElement.highLightElement(driver, ele);
	    waitMethods.waiter(waitMethods.w5k);
	    ele.click();   
	    waitMethods.waiter(waitMethods.w5k);
	    System.out.println("Selected MR - Test Checkbox");
	} 
	
	
} //class
