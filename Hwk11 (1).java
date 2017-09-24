package hwk11;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.BoxLayout;
import javax.swing.ButtonGroup;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

@SuppressWarnings("serial")
public class Hwk11 extends JFrame {
	static JRadioButton xPlayer;
	static JRadioButton oPlayer;
	Hwk11() {
		this.setTitle("Tic Tac Toe");
		this.setBounds(0, 0, 600, 600);
		this.setDefaultCloseOperation(EXIT_ON_CLOSE);
	}

	public static void main(String[] args) throws IOException {
		// create a frame with border layout
		JFrame frame = new Hwk11();
		frame.setLayout(new BorderLayout());

		// create a panel with box layer aligned with y axis
		JPanel listPane = new JPanel();
		listPane.setLayout(new BoxLayout(listPane, BoxLayout.Y_AXIS));
		JPanel buttonPane = new JPanel();
		buttonPane.setLayout(new FlowLayout());

		// create a new game button and radio button that are centered on x axis
		JButton newGame = new JButton("New Game");
		newGame.setAlignmentX(Component.CENTER_ALIGNMENT);
		xPlayer = new JRadioButton("X starts");
		xPlayer.setAlignmentX(Component.CENTER_ALIGNMENT);
		oPlayer = new JRadioButton("O starts");
		oPlayer.setAlignmentX(Component.CENTER_ALIGNMENT);
		ButtonGroup xoGroup = new ButtonGroup();
		xoGroup.add(xPlayer);
		xoGroup.add(oPlayer);

		// add the new game button to the game panel
		listPane.add(newGame, BoxLayout.X_AXIS);
		buttonPane.add(xPlayer, BoxLayout.X_AXIS);
		buttonPane.add(oPlayer, BoxLayout.X_AXIS);

		// create a box panel with 3 x 3 grid layout
		JPanel boxPane = new JPanel();
		boxPane.setLayout(new GridLayout(3, 3));

		// create an array of 9 buttons and add them to the box panel
		JButton[] buttons = new JButton[9];
		for (int i = 0; i < buttons.length; i++) {
			buttons[i] = new JButton();
			boxPane.add(buttons[i]);
		}
		
		// create panel for labels
		JPanel labelPane = new JPanel();
		labelPane.setLayout(new FlowLayout());
		
		// create labels for the wins/draws and add them to the panel
		TicTacToe.labelX = new JLabel("Number of X wins: " + TicTacToe.xWins + "   ");
		TicTacToe.labelO = new JLabel("Number of O wins: " + TicTacToe.oWins);
		TicTacToe.labelD = new JLabel("   " + "Number of draws: " + TicTacToe.draws);
		labelPane.add(TicTacToe.labelX);
		labelPane.add(TicTacToe.labelO);
		labelPane.add(TicTacToe.labelD);
		
		// instantiate a tic-tac-toe game object
		final TicTacToe game = new TicTacToe(buttons);

		// add an action listener to the new-game buttom so that it clears the
		// game on click.
		ActionListener resetGame = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				game.clear();
				xPlayer.setEnabled(true);
				oPlayer.setEnabled(true);
			}
		};
		newGame.addActionListener(resetGame);
		
		// add an action listener to the radio buttons so if "x starts" is pressed, x
		// will start and if "o starts" is pressed, o will start. Also disable after
		// a square is pressed
		ActionListener xStart = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				TicTacToe.isX = true;
			}
		};
		ActionListener oStart = new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				TicTacToe.isX = false;
			}
		};
		xPlayer.addActionListener(xStart);
		oPlayer.addActionListener(oStart);
		// add game panel (north) and box panel (center) to the frame and set it
		// visible
		frame.add(listPane, BorderLayout.NORTH);
		listPane.add(buttonPane, BorderLayout.NORTH);
		frame.add(boxPane, BorderLayout.CENTER);
		frame.add(labelPane, BorderLayout.SOUTH);
		frame.setVisible(true);


	}
}

class TicTacToe {
	// these hold the number of wins and draws
	static int xWins;
	static int oWins;
	static int draws;
	
	// this boolean holds the win condition
	boolean gameEnded;
	
	// win/draw labels
	static JLabel labelX;
	static JLabel labelO;
	static JLabel labelD;
	
	// this count holds the number of x's or o's placed
	static int count;
	// this array holds flags for buttons
	// 0 means not clicked
	// 1 means X
	// 2 means O
	int[] data = new int[9];

	// array of buttons representing the grid cells of the game
	JButton[] buttons;
	
	// array of winning row/column/diagonals
	int[] winData = new int[3];

	// this means next move will be X if true and O if false
	static boolean isX;

	// use this fields to hold image icons loaded from files
	ImageIcon icon_x, icon_o;

	// save buttons array
	// load icons
	// clear the grid (call the clear method)
	// add listener (call the addListener method)
	TicTacToe(JButton[] buttons) throws IOException {
		this.buttons = buttons;
		try {
			this.icon_x = new ImageIcon(ImageIO.read(getClass().getResource("X.png")));
			this.icon_o = new ImageIcon(ImageIO.read(getClass().getResource("O.png")));
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		clear();
		addListener();
	}

	// add action the same button listner to all buttons
	private void addListener() {
		for (int i = 0; i < buttons.length; i++) {
			buttons[i].putClientProperty("index", i);
			buttons[i].addActionListener(buttonListener);
		}
	}

	// create a button listener object directly from ActionListener interface
	// by overridding its actionPerformed method
	//
	// the actionPerformed method will find out
	// which button is clicked and
	// whether the click is successful and switch the player if so
	ActionListener buttonListener = new ActionListener() {
		@Override
		public void actionPerformed(ActionEvent e) {
			JButton b = (JButton) e.getSource();
			int i = (int) b.getClientProperty("index");
			if (TicTacToe.isX == true) {
				if (play(i, TicTacToe.isX) == true) {
					TicTacToe.isX = false;
					count++;
					if (count == 1) {
						Hwk11.xPlayer.setEnabled(false);
						Hwk11.oPlayer.setEnabled(false);
					}
				}
			}
			else if ( TicTacToe.isX == false) {
				if (play(i, TicTacToe.isX) == true) {
					TicTacToe.isX = true;
					count++;
					if (count == 1) {
						Hwk11.xPlayer.setEnabled(false);
						Hwk11.oPlayer.setEnabled(false);
					}
				}
			}
			if (win() == 1) {
				System.out.println("X wins!");
				gameEnded = true;
				xWins++;
				labelX.setText("Number of X wins: " + xWins + "   ");
			}
			else if (win() == 2) {
				System.out.println("O wins!");
				gameEnded = true;
				oWins++;
				labelO.setText("Number of O wins: " + oWins);
			}
			if (count == 9 && win() == 0) {
				count = 10;
				System.out.println("Draw!");
				gameEnded = true;
				draws++;
				labelD.setText("   " + "Number of draws: " + draws);
			}
						
	};
	};
	// set the background color to each button to white 
	// remove icons by calling setIcon(null)
	// clear the data array to 0
	// reset isX to true
	void clear() {
		count = 0;
		for (int i = 0; i < this.buttons.length; i++) {
			buttons[i].setBackground(Color.WHITE);
			buttons[i].setIcon(null);
		}
		for (int i = 0; i < data.length; i++) {
			data[i] = 0;
		}
		isX = true;
		if (gameEnded == true) {
			addListener();
			gameEnded = false;
		}
	}
	
	// remove listener from all buttons and set "gameEnded" flag to true
	void removeListener() {
		for (int j = 0; j < buttons.length; j++) {
			buttons[j].removeActionListener(buttonListener);
		}
	}
	  
	// put X or O at the i'th button
	// set the data array to 1 for X and 2 for O
	//
	// returns true if i'th button is not already clicked
	private boolean play(int i, boolean isX) {
		if (isX == true && data[i] == 0) {
			  buttons[i].setIcon(icon_x);
			  data[i] = 1;
		}
		else if (isX == false && data[i] == 0) {
				buttons[i].setIcon(icon_o);
				data[i] = 2;
			}
		else {
			return false;
		}
		return true;
	}  
	// if X wins, return 1, 
	// if O wins, return 2, 
	// if draws or no result, return 0
	//
	// if someone wins, the remove listeners so that subsequent clicks won't change the remaining unclicked buttons
	int win() {
		int val = 0;
		for (int i = 0; i < 3; i++) {
			if (checkColumn(i) == 1) {
				val = 1;
			}
			else if (checkColumn(i) == 2) {
				val = 2;
			}
		}
		for (int j = 0; j < 8; j = j + 3) {
			if (checkRow(j) == 1) {
				val = 1;
			}
			else if (checkRow(j) == 2) {
				val = 2;
			}
		}
		if (checkDiagonal() == 1) {
			val = 1;
		}
		else if (checkDiagonal() == 2) {
			val = 2;
		}
		if (val != 0) {
			removeListener();
		}
		return val;
	}

	// check whether the ith row matches
	//       if so, set the background for that row of buttons to blue color
	//       and also return 1 if X wins, 2 if O wins, 0 if nobody wins
	int checkColumn(int i) {
		int val = 0;
		if (data[i] == 1 && data[i + 3] == 1 && data[i + 6] == 1) {
			int[] indices = {i, i + 3, i + 6};
			setBackground(indices);
			val = 1;
		}
		else if (data[i] == 2 && data[i + 3] == 2 && data[i + 6] == 2) {
			int[] indices = {i, i + 3, i + 6};
			setBackground(indices);
			val = 2;
		}
		return val;
	}

	// check whether the ith column matches
	//       if so, set the background for that column of buttons to blue color
	//       and also return 1 if X wins, 2 if O wins, 0 if nobody wins
	int checkRow(int i) {
		int val = 0;
		if (data[i] == 1 && data[i + 1] == 1 && data[i + 2] == 1) {
			int[] indices = {i, i + 1, i + 2};
			setBackground(indices);
			val = 1;
		}
		else if (data[i] == 2 && data[i + 1] == 2 && data[i + 2] == 2) {
			int[] indices = {i, i + 1, i + 2};
			setBackground(indices);
			val = 2;
		}
		return val;
	}

	// check whether a diagonal matches
	//       if so, set the background for that diagonal of buttons to blue color
	//       and also return 1 if X wins, 2 if O wins, 0 if nobody wins
	// note that there are two diagonals to check
	int checkDiagonal() {
		int val = 0;
		if (data[0] == 1 && data[4] == 1 && data[8] == 1) {
			int[] indices = {0, 4, 8};
			setBackground(indices);
			val = 1;
		}
		else if (data[2] == 1 && data[4] == 1 && data[6] == 1) {
			int[] indices = {2, 4, 6};
			setBackground(indices);
			val = 1;
		}
		else if (data[0] == 2 && data[4] == 2 && data[8] == 2) {
			int[] indices = {0, 4, 8};
			setBackground(indices);
			val = 2;
		}
		else if (data[2] == 2 && data[4] == 2 && data[6] == 2) {
			int[] indices = {2, 4, 6};
			setBackground(indices);
			val = 2;
		}
		return val;
	}

	// set buttons at the specified indices to blue
	void setBackground(int[] indices) {
		for (int i = 0; i < indices.length; i++) {
			buttons[indices[i]].setBackground(Color.BLUE);
		}
	}
}