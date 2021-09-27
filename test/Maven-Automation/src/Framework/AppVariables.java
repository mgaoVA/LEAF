package Framework;

public class AppVariables {


	public final static String CHROMEDRIVER = "C:/DEV/Tools/Selenium/ChromeDriver_94.0.4606.61/chromedriver.exe";
	//public final static String CHROMEDRIVER = "C:/DEV/Tools/Selenium/ChromeDriver_92.0.4515.43/chromedriver_win32/chromedriver.exe";

										

	public final static String IEDRIVER = "C:/DEV/Tools/Selenium/IEDriver/IEDriverServer_Win32_3.150.1/IEDriverServer.exe";
	
	//Environment - Change this value to select environment
	
	public final static String ENVLOCAL = "http://localhost/LEAF_Request_Portal/";   			//Local Env
	public final static String ENVQA = "http://qa environment/";								//QA Env (When ready) UPDATE
	public final static String ENVDEV = "http://leaf-dev.va.gov/LEAF_Request_Portal/admin/";	//DEV Env
	public final static String ENVPROD = "http://PROD environment/";							//PROD		UPDATE
	
	//public final static String BROWSER = "Chrome";
	//public final static String BROWSER = "IE";
	
	
	//Local environment

	//public final static String LOCALURI ="http://localhost/LEAF_Request_Portal/";
	public final static String LOCALUID = "tester";
	public final static String LOCALPWD = "tester";

	//QA Environment
	public final static String QAURI ="";
	public final static String PRODURI ="";
	//public final static String URI = "https://www.google.com/";

	public final static String NULLURL = "https://";


// ***************************************************************** 
 public final static String LOCALURI = "http://localhost/LEAF_Request_Portal/";
 
 
 //Change this variable to turn highlighting off
 public final static boolean demoMode = false; 

 
//Change this variable to to true to run in headless mode with correct parameters, resolution,
 public final static boolean headless = false;	



}  //class
