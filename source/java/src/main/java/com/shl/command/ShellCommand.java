package com.shl.command;


public class ShellCommand {
	public String executeCommand(String command) {

		Process p;
		try {
			p = Runtime.getRuntime().exec(command);
			p.waitFor();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "done";

	}
}
