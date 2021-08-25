package Framework;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class setupFramework {

	public WebDriver driver;
	
	public WebDriver getDriver() {						
	        return driver;					//THIS IS CORRECT - ChromeDriver
	}										
	
	
	//Need to add Firefox (& driver) and Edge
	private void setDriver(String browser, String env) 	{			
	   switch (browser) {     //Step Over
	   		case "chrome":
	   			driver = chromeLogin(env);
	   			break;
	   		case "IE":
	   			driver = ieLogin(env);
	   			break;
	   		default:
	   			System.out.println("browser : " + browser + " is invalid, Launching Chrome as browser of choice..");

	   		driver = chromeLogin(env);
	   }
	}  // OVER
	

	//highlightFlash(WebElement element)  //method
	//fp.highlightFlash(returnedElement);  //called using this
	
	
	private static WebDriver chromeLogin(String env) {						//This is all I need for now
		//Currently version 90.0.4430.93
		System.out.println("Launching Chrome");  //Step Over until - return driver;
		System.setProperty("webdriver.chrome.driver", Framework.AppVariables.CHROMEDRIVER);
		
		
			if (AppVariables.headless) {
				ChromeOptions options = new ChromeOptions();
				options.addArguments("--headless", "--disable-gpu", "--window-size=1920,1200",
						"--ignore-certificate-errors", "--disable-extensions", "--no-sandbox",
						"--disable-dev-shm-usage");
				WebDriver driver = new ChromeDriver(options);
				driver.navigate().to(env);
				System.out.println("Driver established for: " + driver.getClass());
				return driver;  //HEADLESS driver

			} else {
				WebDriver driver = new ChromeDriver();
				driver.manage().window().maximize();
				driver.navigate().to(env);
				System.out.println("Driver established for: " + driver.getClass());
				
				return driver;  

			}
		
//		System.out.println("driver = " + driver.getClass().toString());
//		
//		return driver;  //driver changed to value null??

	}	

	//I believe this is the correct driver for the version of IE on Adaptive machine
	private static WebDriver ieLogin(String env) {
		System.setProperty("webdriver.ie.driver", Framework.AppVariables.IEDRIVER);
		WebDriver driver = new InternetExplorerDriver();							//Change to access IE
		System.out.println("Launching IE");
		driver.manage().window().maximize();
		driver.navigate().to(env);
	
		return driver;

	}
	
	
	@Parameters({ "browser", "env" })									//Pass Browser type and URL
	@BeforeClass
	//Kill all instances of Chrome and ChromeDriver ******************************************************TODO
	public void initializeFramework(String browser, String env) {
		try {
			setDriver(browser, env);
		} catch (Exception e) {  //Over
			System.out.println("Error in initializingTestBaseSetup(): " + e.getStackTrace());
		}

	}
	
	
	@AfterClass
	public void closeDown() {
		System.out.println("@AfterClass disabled - browser remains open");
		driver.quit();
		//System.out.println("setupFramework reached @AfterClass, driver.quit()");
	}
	
	
	
	
	
} //class

