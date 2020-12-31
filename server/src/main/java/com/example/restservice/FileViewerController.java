package com.example.restservice;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FileViewerController {

	private static final String ROOT_DIR = "./";

	@GetMapping("/")
	public Map<String, String> greeting(@RequestParam String dir) throws IOException {
		Map<String, String> results = new HashMap<>();
		List<Path> files = Files.find(Paths.get(ROOT_DIR + dir),
				Integer.MAX_VALUE,
				(filePath, fileAttr) -> fileAttr.isRegularFile())
				.collect(Collectors.toList());
		for (Path path : files) {
			results.put(path.toString(), new String(Files.readAllBytes(path)));
		}
		return results;
	}
}
