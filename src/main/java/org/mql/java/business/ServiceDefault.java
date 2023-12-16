package org.mql.java.business;

import java.io.BufferedReader;
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

            //int exitCode = process.waitFor();

            return output.toString();
		} catch (Exception e) {
			return "Erreur : " + e.getMessage();
		}
	}

}
