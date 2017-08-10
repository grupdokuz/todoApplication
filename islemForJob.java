import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.TimeUnit;

public class islemForJob {
	public static void main(String[] args) {
		doWork();
	}

	private static void doWork() {
		String[] a = { "sqlite3", "db/development.sqlite3" };
		execSign(a);
	}

	public static void exec(String[] a) {

		try {
			Process p = Runtime.getRuntime().exec(a);
			new Thread(new Runnable() {
				public void run() {
					BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
					String line = null;
					try {
						while ((line = input.readLine()) != null) {
							System.out.println(line);
						}
					} catch (IOException e) {
						System.out.println("bura");
						e.printStackTrace();
					}
				}
			}).start();

			p.waitFor();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}

	public static void execSign(String[] a) {

		try {
			Process p = Runtime.getRuntime().exec(a);
			new Thread(new Runnable() {
				public void run() {
					try {
						p.getOutputStream()
								.write("select due_date,title from todos where due_date< DateTime('now','+191 minute') and due_date> DateTime('now','+190 minute')  ;\n"
										.getBytes());
						p.getOutputStream().flush();
						BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
						String line = null;

						while ((line = input.readLine()) != null) {

							System.out.println(line);
							String[] b = { "python", "send.py", "due date is:" + line.substring(0, 19),
									line.substring(20) };
							exec(b);

						}
					} catch (IOException e) {
						System.out.println("bura");
						e.printStackTrace();
					}
				}
			}).start();
			if (!p.waitFor(40, TimeUnit.SECONDS)) {
				// timeout - kill the process.
				p.destroy(); // consider using destroyForcibly instead
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}

}
