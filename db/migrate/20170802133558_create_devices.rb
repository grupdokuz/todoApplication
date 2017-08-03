class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.string :registration_id
      t.string :device_type

      t.timestamps
    end
  end
end
