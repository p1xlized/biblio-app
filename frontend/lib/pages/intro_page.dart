import 'package:flutter/material.dart';
// import 'package:google_nav_bar/google_nav_bar.dart';

class IntroPage extends StatelessWidget {
  const IntroPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('I N T R O P A G E'),
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.settings),
            tooltip: 'Open shopping cart',
            onPressed: () {
              // handle the press
            },
          ),
        ],),
      body: Center(
        child: ElevatedButton(onPressed: (){
          //Navigator.push(context, MaterialPageRoute(builder: (context) => const HomePage()));
          Navigator.pushNamed(context, '/home');
        }, child: const Text("Go to Home")),
      ),

    );
  }
}