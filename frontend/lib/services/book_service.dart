import 'dart:convert';
import 'package:http/http.dart' as http;
import '/models/book.dart';
import '/constants/api.dart'; // Import the api constants

class BookService {
  // Use the apiUrl constant from constants/api.dart
  Future<List<Book>> fetchBooks() async {
    final response = await http.get(Uri.parse('$baseUrl/books'));

    if (response.statusCode == 200) {
      print(response.body);
      final List t = json.decode(response.body);
      return t.map((item) => Book.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load books');
    }
  }
}