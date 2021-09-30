package Execution;

import org.testng.annotations.Test;

//Is the 'Run All' needed? I can't delete it
public class TestMavenCI {

	@Test(priority=1)
	public void TestCI() {
		System.out.println("Method TestCI() executed");
	}
	
	
}  //class
