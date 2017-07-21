# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

first = Todo.create(
  title: "Deneme 1",
  created_by: "Mesut Kutlu",
)
first.items.create(name: "Bakkaldan iki ekmek al gel evladim",done: true)
first.items.create(name: "Aldin, simdi geri don", done: false)


second = Todo.create(
  title: "Deneme 2",
  created_by: "Mesut Kutlu",
)
second.items.create(name: "bil495 calisma", done: true)
second.items.create(name: "bil495 calis", done: false)
