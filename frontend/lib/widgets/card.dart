import 'package:flutter/material.dart';

class CustomCard extends StatelessWidget {
  final String coverImg;  
  // final String title;     
  // final String publisher; 

  const CustomCard({
    Key? key,
    required this.coverImg,

  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      margin: const EdgeInsets.all(10),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.network(
            coverImg,
            width: 120,
            height: 180,
            fit: BoxFit.fill,
          ),
          const SizedBox(height: 10.0),
        ],
      ),
    );
  }
}
