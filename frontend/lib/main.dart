import 'package:flutter/material.dart';
import 'package:frontend/pages/home_page.dart';

import 'pages/intro_page.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MainPage(),
      // theme: ThemeData(primarySwatch: Colors.purple),
      routes: {
        '/home': (context) => MainPage(),
        '/intro': (context) => const IntroPage(),
      },
      
    );
  }
}
class MainPage extends StatefulWidget {
  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int index = 0;
  final pages = [
    const HomePage(),
    const Center(child: Text("Scan")),
    const Center(child: Text("Favorites")),
    const Center(child: Text("Profile")),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: pages[index],
      ),
      //backgroundColor: Colors.purple[100],
      body: pages[index],
      bottomNavigationBar: NavigationBar(
        // backgroundColor: Colors.purple[100], S
        indicatorColor: Colors.blue[200],
        // labelTextStyle: WidgetStateProperty.all(const TextStyle(
        //   fontSize: 14,
        //   fontWeight: FontWeight.w500,
        // )),
        height: 68,
        selectedIndex: index,
        onDestinationSelected: (index) => setState(() => this.index = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home), label: "Home"),
          NavigationDestination(icon: Icon(Icons.qr_code_sharp), label: "Scan"),
          NavigationDestination(
              icon: Icon(Icons.favorite_rounded), label: "Favorites"),
          NavigationDestination(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}
