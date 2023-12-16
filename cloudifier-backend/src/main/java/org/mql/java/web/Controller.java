package org.mql.java.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import org.mql.java.business.Service;
import org.mql.java.business.ServiceDefault;

@WebServlet("/proxmox-api/*")
public class Controller extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private Service service;
	
    public Controller() {
    	service = new ServiceDefault();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		PrintWriter out = response.getWriter();
		if(uri.contains("/execute-command")) {
			String command = request.getParameter("command");
			out.print(service.executeCommand(command));
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
