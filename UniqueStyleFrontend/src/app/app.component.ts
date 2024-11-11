import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { BadgeModule } from 'primeng/badge';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { UniqueStyleService } from './services/unique-style.service';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,CarouselModule,SidebarModule,ToastModule, FormsModule,  PasswordModule, FloatLabelModule, InputTextModule, DialogModule, RouterOutlet, ButtonModule, SpeedDialModule, BadgeModule, FieldsetModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class AppComponent implements OnInit, AfterViewInit {


  title = 'UniqueStyleFrontend';

  items!: MenuItem[];

  elementsCart: Product[] = []

  visible: boolean = false;

  password: string = '';
  email: string = '';

  listProducts: Product[] = [];
  
  sidebarVisible: boolean = false;

  responsiveOptions = [
    { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
    { breakpoint: '991px', numVisible: 1, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private readonly uniqueStyleService: UniqueStyleService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {


    // this.loadData()

    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          // this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          console.log('Add');

        }
      },
    ];
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showDialog();
    }

  }

  showDialog() {
    this.visible = true;
  }

  onLogin() {
    this.uniqueStyleService.login(this.email, this.password).then((res) => {
      if (res) {
        this.visible = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inicio de sesión exitoso' });
        this.loadData();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
      }
    });
  }

  loadData(){
    this.uniqueStyleService.getProducts().subscribe((res: Product[]) => {
      console.log(res);
      this.listProducts = res;
    });
  }

  addCart(product: Product){
    this.elementsCart.push(product);
  }

  showSide(){
    this.sidebarVisible = true;
  }

  closeSide(){
    this.sidebarVisible = false;
  }

  buyProduct(){

    if(this.elementsCart.length === 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay productos en el carrito' });
      return;
    }else{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Compra realizada con éxito' });
      this.elementsCart = [];
      this.sidebarVisible = false;
    }

  }

}


export interface Product {
  id?: string;
  images: string[];
  title: string;
  price: number;
  description: string;
}
