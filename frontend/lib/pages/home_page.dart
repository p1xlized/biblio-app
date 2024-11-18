import 'package:flutter/material.dart';
import 'package:frontend/models/book.dart';
import 'package:frontend/widgets/card.dart'; // Your CustomCard widget
import 'package:frontend/services/book_service.dart'; // Service to fetch books

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<Book>> _bookFuture;

  @override
  void initState() {
    super.initState();
    _bookFuture = BookService().fetchBooks(); // Fetch books from the service
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Library", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),),
      ),
      body:
      FutureBuilder<List<Book>>(
        future: _bookFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No books found.'));
          }

          List<Book> books = snapshot.data!;

          return GridView.builder(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              childAspectRatio: 2 / 3,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
            ),
            itemCount: books.length,
            itemBuilder: (context, index) {
              final book = books[index];
              return CustomCard(
                coverImg: book.coverImg ?? '',
              );
            },
          );
        },
      ),
    );
  }
}
