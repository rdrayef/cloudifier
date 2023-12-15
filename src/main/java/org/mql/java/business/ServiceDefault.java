package org.mql.java.business;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ServiceDefault implements Service {

	public String executeCommand(String command) {
		try {
			Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            int exitCode = process.waitFor();

            return "Command executed with exit code " + exitCode + "\nOutput:\n" + output.toString();
		} catch (IOException | InterruptedException e) {
			return "Erreur : " + e.getMessage();
		}
	}

}
